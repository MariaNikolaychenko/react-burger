import React from "react";
import { ProfileNav } from "./profile-nav";
import { Outlet } from "react-router-dom";

import styles from "./profile.module.css";

export const Profile = (): React.JSX.Element => {

    return(
		<div className={styles.container} >
			<ProfileNav />
			<div className={styles.profile_col}>
				<Outlet />
			</div>
		</div>
	);
};