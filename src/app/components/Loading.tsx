import { Skeleton } from "@mui/material";

export default function Loading() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        gap: 8,
      }}
    >
      <Skeleton variant="text" height={20} width={200} />
      <Skeleton variant="text" height={20} width={180} />
      <Skeleton variant="text" height={20} width={160} />
      <Skeleton variant="text" height={20} width={200} />
    </div>
  );
}
