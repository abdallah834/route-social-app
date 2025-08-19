export default function ErrorMsg({ error = null }) {
  return (
    <>
      <span className="text-red-600 block mt-1.5 font-semibold ms-2">
        {error}
      </span>
    </>
  );
}
