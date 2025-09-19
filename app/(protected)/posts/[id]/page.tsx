"use client";
import PostDetails from "@/modules/Posts/Details";

export default function PostDetailsPage({
  params,
}: {
  params: { id: number };
}) {
  console.log(params, "page");

  return <PostDetails params={params} />;
}
