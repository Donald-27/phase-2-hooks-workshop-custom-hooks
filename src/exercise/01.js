import { useEffect } from "react";

// ✅ This sets a default value for title if nothing is passed
export function useDocumentTitle(title = "Welcome to the home page!") {
  useEffect(() => {
    document.title = title;
  }, [title]);
}

export default function Home() {
  // ✅ You can still pass in a specific title here
  useDocumentTitle("Welcome to the home page!");

  return (
    <div>
      <h1>Home Page</h1>
      <p>
        To see the title change in the browser tab, click the 'Open in new tab'
        link above
      </p>
    </div>
  );
}
