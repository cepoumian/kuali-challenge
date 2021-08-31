export default function DisplayError({ error }) {
  console.log(error);
  return (
    <div>
      <p>{error}</p>
    </div>
  );
}
