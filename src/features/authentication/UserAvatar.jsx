import styled from "styled-components";
import { useUser } from "./useUser";
import { useNavigate } from "react-router-dom"; // import navigate hook

const StyledUserAvatar = styled.div`
  display: flex;
  gap: 1.2rem;
  align-items: center;
  font-weight: 500;
  font-size: 1.4rem;
  color: var(--color-grey-600);
  cursor: pointer; /* indicate clickable */
`;

const Avatar = styled.img`
  display: block;
  width: 3.6rem;
  aspect-ratio: 1;
  object-fit: cover;
  object-position: center;
  border-radius: 50%;
  outline: 2px solid var(--color-grey-100);
`;

function UserAvatar() {
  const { user } = useUser();
  const { fullName, avatar } = user.user_metadata;
  const navigate = useNavigate();

  // handle click on avatar
  const handleClick = () => {
    navigate("/account");
  };

  return (
    <StyledUserAvatar onClick={handleClick}>
      <Avatar src={avatar || "default-user.jpg"} alt={`Avatar of ${fullName}`} />
      <span>{fullName}</span>
    </StyledUserAvatar>
  );
}

export default UserAvatar;
