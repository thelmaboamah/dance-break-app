import styles from "../styles/Dashboard.module.css";
import { PassageAuthGuard } from "@passageidentity/passage-react";
import { usePassageUserInfo } from "../hooks";
import LogoutButton from "../components/LogoutButton";
import { fetchTableData } from "../utils/queries";

import { useQuery } from '@tanstack/react-query'

function Dashboard() {
  const { userInfo, loading } = usePassageUserInfo();
  console.log("USer info is ", userInfo)

  const tableName = 'notes'
  const query = useQuery({ queryKey: ['todos', tableName], queryFn: () => fetchTableData(tableName) })
  console.log("Query is ", query.data)
  
  if (loading) {
    return (
      <div className={styles.dashboard}>
        <div className={styles.title}>Loading</div>
      </div>
    );
  }

  return (
    <PassageAuthGuard
      unAuthComp={
        <div className={styles.dashboard}>
          <div className={styles.title}>you must be logged in</div>
          <div className={styles.message}>
            <a href="/">Login</a>
          </div>
        </div>
      }
    >
      <div className={styles.dashboard}>
        <div className={styles.title}>Welcome</div>
        <div className={styles.message}>
          You successfully signed in with Passage. This is your homepage. <br />
          <br />
          Your username is: {userInfo?.email}
          <div>Your data: {query.data}</div>
        </div>
        <LogoutButton />
      </div>
    </PassageAuthGuard>
  );
}

export default Dashboard;
