"use client";
import PostDetails from "@/modules/Posts/Details";

export default function PostDetailsPage({
  params,
}: {
  params: { id: number };
}) {
  return <PostDetails params={params} />;
}
