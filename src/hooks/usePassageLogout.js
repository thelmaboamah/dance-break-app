import { usePassage } from "@passageidentity/passage-react";

export const usePassageLogout = () => {
  const { getCurrentSession } = usePassage();

  const logout = () => {
    try {
      const currentSession = getCurrentSession();
      if (currentSession) {
        currentSession.signOut();
      }
    } catch (err) {
      console.log("Error on signout ", err)
    }
  };

  return { logout };
};

export default usePassageLogout;
