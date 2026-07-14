import { useEffect, useState } from "react";
import {
  Navigate,
  Route,
  Routes,
  useNavigate,
  useParams,
} from "react-router-dom";
import { CommunityPage } from "./pages/CommunityPage";
import { CommunityViewPage } from "./pages/CommunityViewPage";
import { CommunityWritePage } from "./pages/CommunityWritePage";
import { HomeDesignPage } from "./pages/HomeDesignPage";
import { LoginPage } from "./pages/LoginPage";
import { SignUpPage } from "./pages/SignUpPage";
import { Button } from "./components/ui/Button";
import { createPost, fetchPostById, fetchPosts } from "./lib/posts";
import {
  fetchBookmarkedPostIds,
  fetchLikedPostIds,
  incrementViewCount,
  setPostBookmarked,
  setPostLiked,
} from "./lib/interactions";
import { getVisitorId } from "./lib/visitor";
import { useAuth } from "./lib/auth";
import type { User } from "@supabase/supabase-js";
import type { PostData } from "./data/mockPosts";

function getUserDisplayName(user: User | null): string | undefined {
  if (!user) return undefined;
  return (
    (user.user_metadata?.full_name as string | undefined) ??
    (user.user_metadata?.name as string | undefined) ??
    user.email?.split("@")[0]
  );
}

function getUserLabel(user: User | null): string | undefined {
  const name = getUserDisplayName(user);
  return name ? `${name}님` : undefined;
}

function CommunityPageRoute() {
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const [posts, setPosts] = useState<PostData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    const visitorId = getVisitorId();

    (async () => {
      const [fetchedPosts, likedIds, bookmarkedIds] = await Promise.all([
        fetchPosts(),
        fetchLikedPostIds(visitorId),
        fetchBookmarkedPostIds(visitorId),
      ]);
      if (cancelled) return;
      setPosts(
        fetchedPosts.map((post) => ({
          ...post,
          liked: likedIds.has(post.id),
          bookmarked: bookmarkedIds.has(post.id),
        })),
      );
      setLoading(false);
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  const handleLikeToggle = (id: string, next: boolean) => {
    setPosts((prev) =>
      prev.map((p) =>
        p.id === id
          ? {
              ...p,
              liked: next,
              likecount: String(Number(p.likecount) + (next ? 1 : -1)),
            }
          : p,
      ),
    );
    setPostLiked(id, getVisitorId(), next).catch(() => {
      setPosts((prev) =>
        prev.map((p) =>
          p.id === id
            ? {
                ...p,
                liked: !next,
                likecount: String(Number(p.likecount) + (next ? -1 : 1)),
              }
            : p,
        ),
      );
    });
  };

  const handleBookmarkToggle = (id: string, next: boolean) => {
    setPosts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, bookmarked: next } : p)),
    );
    setPostBookmarked(id, getVisitorId(), next).catch(() => {
      setPosts((prev) =>
        prev.map((p) => (p.id === id ? { ...p, bookmarked: !next } : p)),
      );
    });
  };

  return (
    <CommunityPage
      posts={posts}
      loading={loading}
      isLoggedIn={Boolean(user)}
      userLabel={getUserLabel(user)}
      onWriteClick={() => navigate("/home/write")}
      onPostClick={(id) => navigate(`/home/view/${id}`)}
      onAuthClick={() => (user ? signOut() : navigate("/login"))}
      onLikeToggle={handleLikeToggle}
      onBookmarkToggle={handleBookmarkToggle}
    />
  );
}

function CommunityWritePageRoute() {
  const navigate = useNavigate();
  const { user, loading, signOut } = useAuth();

  useEffect(() => {
    if (!loading && !user) navigate("/login", { replace: true });
  }, [loading, user, navigate]);

  if (loading || !user) return null;

  return (
    <CommunityWritePage
      isLoggedIn
      userLabel={getUserLabel(user)}
      onAuthClick={() => signOut()}
      onSubmit={async (input) => {
        await createPost(input, {
          userId: user.id,
          name: getUserDisplayName(user) ?? "사용자",
          role: "인증 사용자",
        });
      }}
    />
  );
}

function CommunityViewPageRoute() {
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const { id } = useParams<{ id: string }>();
  const [result, setResult] = useState<{
    id: string;
    post: PostData | null;
  } | null>(null);

  useEffect(() => {
    if (!id) return;
    let cancelled = false;
    const visitorId = getVisitorId();

    (async () => {
      await incrementViewCount(id).catch(() => {});
      const [post, likedIds, bookmarkedIds] = await Promise.all([
        fetchPostById(id),
        fetchLikedPostIds(visitorId),
        fetchBookmarkedPostIds(visitorId),
      ]);
      if (cancelled) return;
      setResult({
        id,
        post: post
          ? {
              ...post,
              liked: likedIds.has(id),
              bookmarked: bookmarkedIds.has(id),
            }
          : null,
      });
    })();

    return () => {
      cancelled = true;
    };
  }, [id]);

  const loading = !id || result === null || result.id !== id;
  const post = result !== null && result.id === id ? result.post : null;

  const handleLikeToggle = (next: boolean) => {
    if (!id) return;
    setResult((prev) =>
      prev && prev.post
        ? {
            ...prev,
            post: {
              ...prev.post,
              liked: next,
              likecount: String(Number(prev.post.likecount) + (next ? 1 : -1)),
            },
          }
        : prev,
    );
    setPostLiked(id, getVisitorId(), next).catch(() => {
      setResult((prev) =>
        prev && prev.post
          ? {
              ...prev,
              post: {
                ...prev.post,
                liked: !next,
                likecount: String(
                  Number(prev.post.likecount) + (next ? -1 : 1),
                ),
              },
            }
          : prev,
      );
    });
  };

  const handleBookmarkToggle = (next: boolean) => {
    if (!id) return;
    setResult((prev) =>
      prev && prev.post
        ? { ...prev, post: { ...prev.post, bookmarked: next } }
        : prev,
    );
    setPostBookmarked(id, getVisitorId(), next).catch(() => {
      setResult((prev) =>
        prev && prev.post
          ? { ...prev, post: { ...prev.post, bookmarked: !next } }
          : prev,
      );
    });
  };

  return (
    <CommunityViewPage
      post={post}
      loading={loading}
      isLoggedIn={Boolean(user)}
      userLabel={getUserLabel(user)}
      onAuthClick={() => (user ? signOut() : navigate("/login"))}
      onLikeToggle={handleLikeToggle}
      onBookmarkToggle={handleBookmarkToggle}
    />
  );
}

function LoginPageRoute() {
  const navigate = useNavigate();
  const { signInWithEmail, signInWithGoogle } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [authError, setAuthError] = useState<string>();

  return (
    <LoginPage
      isLoading={isLoading}
      passwordError={authError}
      onSubmit={async ({ email, password }) => {
        setAuthError(undefined);
        setIsLoading(true);
        const { error } = await signInWithEmail(email, password);
        setIsLoading(false);
        if (error) {
          setAuthError("이메일 또는 비밀번호가 올바르지 않습니다");
          return;
        }
        navigate("/home");
      }}
      onSignUp={() => navigate("/signup")}
      onGoogleLogin={async () => {
        setAuthError(undefined);
        const { error } = await signInWithGoogle();
        if (error)
          setAuthError("구글 로그인에 실패했습니다. 잠시 후 다시 시도해주세요");
      }}
    />
  );
}

function SignUpPageRoute() {
  const navigate = useNavigate();
  const { signUpWithEmail, signInWithGoogle } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [emailError, setEmailError] = useState<string>();
  const [passwordError, setPasswordError] = useState<string>();
  const [signUpComplete, setSignUpComplete] = useState(false);

  if (signUpComplete) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          width: "100%",
          minHeight: "100vh",
          padding: "200px 0",
          boxSizing: "border-box",
          background: "var(--background-subtle)",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "var(--spacing-16)",
            width: "720px",
            padding: "90px 160px",
            boxSizing: "border-box",
            borderRadius: "var(--radius-2xl)",
            background: "var(--background-default)",
            textAlign: "center",
          }}
        >
          <p
            style={{
              font: "var(--body-lg-regular)",
              color: "var(--text-primary)",
              margin: 0,
            }}
          >
            가입 확인 이메일을 보냈습니다.
            <br />
            이메일함에서 인증을 완료해주세요.
          </p>
          <Button variant="core" size="md" onClick={() => navigate("/login")}>
            로그인 하러 가기
          </Button>
        </div>
      </div>
    );
  }

  return (
    <SignUpPage
      isLoading={isLoading}
      emailError={emailError}
      passwordError={passwordError}
      onLogin={() => navigate("/login")}
      onGoogleSignUp={async () => {
        setEmailError(undefined);
        const { error } = await signInWithGoogle();
        if (error)
          setEmailError("구글 가입에 실패했습니다. 잠시 후 다시 시도해주세요");
      }}
      onSubmit={async ({ email, password }) => {
        setEmailError(undefined);
        setPasswordError(undefined);
        setIsLoading(true);
        const { error } = await signUpWithEmail(email, password);
        setIsLoading(false);
        if (error) {
          if (error.toLowerCase().includes("already registered")) {
            setEmailError("이미 가입된 이메일입니다");
          } else if (error.toLowerCase().includes("password")) {
            setPasswordError(
              "비밀번호가 너무 짧습니다 (6자 이상 입력해주세요)",
            );
          } else {
            setEmailError("회원가입에 실패했습니다. 잠시 후 다시 시도해주세요");
          }
          return;
        }
        setSignUpComplete(true);
      }}
    />
  );
}

function HomeDesignPageRoute() {
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  return (
    <HomeDesignPage
      isLoggedIn={Boolean(user)}
      userLabel={getUserLabel(user)}
      onWriteClick={() => navigate("/home/write")}
      onPostClick={(id) => navigate(`/home/view/${id}`)}
      onAuthClick={() => (user ? signOut() : navigate("/login"))}
    />
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/home" replace />} />
      <Route path="/login" element={<LoginPageRoute />} />
      <Route path="/signup" element={<SignUpPageRoute />} />
      <Route path="/home" element={<CommunityPageRoute />} />
      <Route path="/home/write" element={<CommunityWritePageRoute />} />
      <Route path="/home/view/:id" element={<CommunityViewPageRoute />} />
      <Route path="/home-design" element={<HomeDesignPageRoute />} />
    </Routes>
  );
}

export default App;
