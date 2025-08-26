export default function NotFound() {
  return (
    <>
      <div className="flex flex-col items-center gap-2 mt-10">
        <h3 className="text-4xl text-red-600 font-bold">404 Page Not found</h3>
        <h3 className="text-xl text-red-600 font-bold">
          The path you are trying to reach doesn't exist.
        </h3>
      </div>
    </>
  );
}
