import React, {useEffect} from 'react';
import Head from 'next/head';
import styles from '../styles/app.module.css'

export default function Layout({children}) {
    useEffect(() => {
        document.body.classList.add(styles["appBody"]);
    
        return () => {
          document.body.classList.remove(styles["appBody"]);
        };
      }, []);
    
    return (
    <div className="container">
        <Head>
            <title>Keeper App</title>
        </Head>
        {children}
        <footer className="footer">
            <p>CopyRight &copy; 2023</p>
        </footer>
    </div>
    );
  }