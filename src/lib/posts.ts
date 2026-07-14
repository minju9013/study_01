import { supabase } from "./supabase";
import type { PostData } from "../data/mockPosts";
import type { PostCardImageType } from "../components/ui/PostCardImage";

interface PostRow {
  id: string;
  author_name: string;
  author_role: string;
  title: string;
  preview: string;
  content: string;
  notice: boolean;
  category: boolean;
  image_type: string | null;
  view_count: number;
  like_count: number;
  created_at: string;
}

const PREVIEW_LENGTH = 80;

function formatDate(isoString: string): string {
  const d = new Date(isoString);
  const yy = String(d.getFullYear()).slice(2);
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${yy}.${mm}.${dd}`;
}

function formatTimeAgo(isoString: string): string {
  const diffMs = Date.now() - new Date(isoString).getTime();
  const diffMin = Math.floor(diffMs / 60000);
  if (diffMin < 1) return "방금 전";
  if (diffMin < 60) return `${diffMin}분 전`;
  const diffHour = Math.floor(diffMin / 60);
  if (diffHour < 24) return `${diffHour}시간 전`;
  return `${Math.floor(diffHour / 24)}일 전`;
}

function toPostData(row: PostRow): PostData {
  return {
    id: row.id,
    notice: row.notice,
    category: row.category,
    title: row.title,
    preview: row.preview,
    timeAgo: formatTimeAgo(row.created_at),
    viewcount: String(row.view_count),
    likecount: String(row.like_count),
    showThum: Boolean(row.image_type),
    imageType: (row.image_type ?? undefined) as PostCardImageType | undefined,
    authorName: row.author_name,
    authorRole: row.author_role,
    date: formatDate(row.created_at),
    content: row.content,
  };
}

export async function fetchPosts(): Promise<PostData[]> {
  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return (data as PostRow[]).map(toPostData);
}

export async function fetchPostById(id: string): Promise<PostData | null> {
  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error) throw error;
  return data ? toPostData(data as PostRow) : null;
}

export interface CreatePostInput {
  title: string;
  content: string;
}

export interface PostAuthor {
  userId: string;
  name: string;
  role: string;
}

export async function createPost(
  input: CreatePostInput,
  author: PostAuthor,
): Promise<PostData> {
  const preview =
    input.content.length > PREVIEW_LENGTH
      ? `${input.content.slice(0, PREVIEW_LENGTH)}...`
      : input.content;

  const { data, error } = await supabase
    .from("posts")
    .insert({
      title: input.title,
      content: input.content,
      preview,
      user_id: author.userId,
      author_name: author.name,
      author_role: author.role,
    })
    .select("*")
    .single();

  if (error) throw error;
  return toPostData(data as PostRow);
}
