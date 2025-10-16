import { 
  ProfileContainer, 
  ProfileHeader, 
  UserDetailsContainer,
  DetailRow,
  DetailLabel,
  DetailValue,
} from "./Profile.styles";
import ProfileImage from "../../assets/Profile.png";

const Profile = () => {
  // Static user data
  const userInfo = {
    firstName: "Akash",
    lastName: "Sharma",
    email: "Akash@example.com",
    city: "Bangalore",
    joinDate: "January 2023"
  };

  return (
    <ProfileContainer role="region" aria-label="User profile">
      <ProfileHeader>
        <img src={ProfileImage} alt={`Profile picture of ${userInfo.firstName} ${userInfo.lastName}`} />
        <h2>{userInfo.firstName} {userInfo.lastName}</h2>
        <p>Member since {userInfo.joinDate}</p>
      </ProfileHeader>

      <UserDetailsContainer role="list" aria-label="User details">
        <DetailRow role="listitem">
          <DetailLabel>First Name:</DetailLabel>
          <DetailValue>{userInfo.firstName}</DetailValue>
        </DetailRow>
        
        <DetailRow role="listitem">
          <DetailLabel>Last Name:</DetailLabel>
          <DetailValue>{userInfo.lastName}</DetailValue>
        </DetailRow>
        
        <DetailRow role="listitem">
          <DetailLabel>Email:</DetailLabel>
          <DetailValue>
            <a 
              href={`mailto:${userInfo.email}`}
              aria-label={`Send email to ${userInfo.email}`}
              tabIndex="0"
            >
              {userInfo.email}
            </a>
          </DetailValue>
        </DetailRow>
        
        <DetailRow role="listitem">
          <DetailLabel>Location:</DetailLabel>
          <DetailValue>{userInfo.city}</DetailValue>
        </DetailRow>
      </UserDetailsContainer>


    </ProfileContainer>
  );
};

export default Profile;