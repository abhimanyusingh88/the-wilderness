import { useEffect, useState } from "react";
import styled from "styled-components";

const StyledLogo = styled.div`
  text-align: center;
`;

const Img = styled.img`
  height: 9.6rem;
  width: auto;
`;

function Logo() {
  const [isDark, setIsDark] = useState(
    document.body.classList.contains("dark-mode")
  );

  useEffect(() => {
    // Watch for changes to the body class
    const observer = new MutationObserver(() => {
      setIsDark(document.body.classList.contains("dark-mode"));
    });

    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  return (
    <StyledLogo>
      <Img
        src={isDark ? "/real-dark-mode.png" : "/now-white.png"}
        alt="Logo"
      />
    </StyledLogo>
  );
}

export default Logo;
