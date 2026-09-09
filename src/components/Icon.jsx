const paths = {
  search: "M21 21l-5-5M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0",
  heart:
    "M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.8-8.6a5.5 5.5 0 0 0 0-7.8Z",
  bag: "M5 7h14l1 14H4L5 7Zm3 0V5a4 4 0 0 1 8 0v2",
  user: "M20 21v-2a7 7 0 0 0-14 0v2M17 6a5 5 0 1 1-10 0 5 5 0 0 1 10 0",
  menu: "M3 6h18M3 12h18M3 18h18",
  close: "m6 6 12 12M6 18 18 6",
  arrow: "M4 12h16m-6-6 6 6-6 6",
  eye: "M1 12s4-8 11-8 11 8 11 8-4 8-11 8S1 12 1 12Zm14 0a3 3 0 1 1-6 0 3 3 0 0 1 6 0",
  leaf: "M20 3C7 1 1 9 6 16c7 6 16-1 14-13ZM4 21 16 8",
  truck:
    "M1 4h13v13H1ZM14 9h5l4 5v3h-9M8 18a2 2 0 1 1-4 0 2 2 0 0 1 4 0m12 0a2 2 0 1 1-4 0 2 2 0 0 1 4 0",
  gift: "M3 8h18v5H3ZM5 13v9h14v-9M12 8v14M12 8S3 8 5 3s7 5 7 5 7-10 7-4-7 4-7 4",
  whatsapp:
    "M21 11.5a9 9 0 0 1-13.4 8L2 21l1.5-5.4A9 9 0 1 1 21 11.5ZM8 7c-2 2 3 8 6 9l2-2-3-2-1 1-2-2 1-1-2-3Z",
};
export default function Icon({ name, size = 21 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d={paths[name] || paths.arrow} />
    </svg>
  );
}
