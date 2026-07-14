import { supabase } from "./supabase";

export async function fetchLikedPostIds(
  visitorId: string,
): Promise<Set<string>> {
  const { data, error } = await supabase
    .from("likes")
    .select("post_id")
    .eq("visitor_id", visitorId);

  if (error) throw error;
  return new Set((data ?? []).map((row) => row.post_id as string));
}

export async function fetchBookmarkedPostIds(
  visitorId: string,
): Promise<Set<string>> {
  const { data, error } = await supabase
    .from("bookmarks")
    .select("post_id")
    .eq("visitor_id", visitorId);

  if (error) throw error;
  return new Set((data ?? []).map((row) => row.post_id as string));
}

export async function setPostLiked(
  postId: string,
  visitorId: string,
  liked: boolean,
): Promise<void> {
  if (liked) {
    const { error } = await supabase
      .from("likes")
      .insert({ post_id: postId, visitor_id: visitorId });
    if (error) throw error;
  } else {
    const { error } = await supabase
      .from("likes")
      .delete()
      .eq("post_id", postId)
      .eq("visitor_id", visitorId);
    if (error) throw error;
  }
}

export async function setPostBookmarked(
  postId: string,
  visitorId: string,
  bookmarked: boolean,
): Promise<void> {
  if (bookmarked) {
    const { error } = await supabase
      .from("bookmarks")
      .insert({ post_id: postId, visitor_id: visitorId });
    if (error) throw error;
  } else {
    const { error } = await supabase
      .from("bookmarks")
      .delete()
      .eq("post_id", postId)
      .eq("visitor_id", visitorId);
    if (error) throw error;
  }
}

export async function incrementViewCount(postId: string): Promise<void> {
  const { error } = await supabase.rpc("increment_view_count", {
    post_id: postId,
  });
  if (error) throw error;
}
