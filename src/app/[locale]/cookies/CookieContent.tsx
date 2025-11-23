import CookieContent from "./CookieContent";

export default function CookiePolicy() {
  return (
    <div className="max-w-3xl mx-auto py-12 px-6 text-gray-200">
      <CookieContent />
      <script
        id="CookieDeclaration"
        src="https://consent.cookiebot.com/ff3af146-1d84-484c-a9f6-d075741e2623/cd.js"
        type="text/javascript"
        async
      ></script>
    </div>
  );
}
