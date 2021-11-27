import React from "react";
import AppLayout from "../../../components/AppLayout/AppLayout";
import Button from "../../../components/Button/Button";
import styles from "../../../styles/ComposeTweed.module.css";

export default function ComposeTweed() {
  return (
    <AppLayout>
      <form>
        <textarea
          placeholder="¿Qué esta pasando?"
          className={styles.textarea}
        ></textarea>
        <div className={styles.buttonCont}>
          <Button>Tweed</Button>
        </div>
      </form>
    </AppLayout>
  );
}
