import React, { useState } from 'react';
import styles from './Form.module.scss';
import Email from '../../../public/assets/email.png';
import Image from 'next/image';
import SuccessModal from '../SuccessModal/SuccessModal';

const SubmitForm = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [fileData, setFileData] = useState(null);
  const [isValidating, setIsValidating] = useState(false);
  const [submitDisabled, setSubmitDisabled] = useState(true);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleFullNameChange = (e) => {
    setFullName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setIsValidating(true);
      const reader = new FileReader();
      reader.onload = (event) => {
        const contents = event.target.result;
        setFileData(contents);
        setIsValidating(false);
        setSubmitDisabled(false);
      };
      reader.readAsText(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowSuccessModal(true);
  };


  const handleCloseSuccessModal = () => {
    setFullName('');
    setEmail('');
    setFileData(null);
    setIsValidating(false);
    setSubmitDisabled(true);
    setShowSuccessModal(false);
  };
  return (
    <div className={styles.submitForm}>
      <h1 style={{
        display :"flex"
      }}>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M16 8C16 8.21216 15.9298 8.41563 15.8047 8.56565C15.6797 8.71567 15.5102 8.79995 15.3334 8.79995H2.27628L7.13862 14.6336C7.20056 14.708 7.24969 14.7962 7.28322 14.8933C7.31674 14.9904 7.33399 15.0945 7.33399 15.1996C7.33399 15.3047 7.31674 15.4088 7.28322 15.5059C7.24969 15.603 7.20056 15.6912 7.13862 15.7656C7.07669 15.8399 7.00315 15.8988 6.92223 15.9391C6.8413 15.9793 6.75457 16 6.66697 16C6.57938 16 6.49264 15.9793 6.41172 15.9391C6.33079 15.8988 6.25726 15.8399 6.19532 15.7656L0.195518 8.56597C0.133536 8.49167 0.0843647 8.40345 0.0508163 8.30633C0.0172679 8.20922 0 8.10513 0 8C0 7.89487 0.0172679 7.79078 0.0508163 7.69366C0.0843647 7.59655 0.133536 7.50832 0.195518 7.43403L6.19532 0.234432C6.32041 0.0843276 6.49007 -1.5816e-09 6.66697 0C6.84388 1.5816e-09 7.01353 0.0843276 7.13862 0.234432C7.26371 0.384536 7.33399 0.588121 7.33399 0.8004C7.33399 1.01268 7.26371 1.21626 7.13862 1.36637L2.27628 7.20004H15.3334C15.5102 7.20004 15.6797 7.28432 15.8047 7.43435C15.9298 7.58437 16 7.78784 16 8Z" fill="black" />
        </svg>
        <span style={{
          marginLeft : '1rem',
          marginTop : '-.5rem'
        }}>
        Submit form
        </span>
      </h1>
      <div className={styles.formGroup}>
        <h2 className={styles.label}>Full Name</h2>
        <div className={styles.inputContainer}>
          <input
            type="text"
            placeholder="Full Name"
            value={fullName}
            onChange={handleFullNameChange}
          />
        </div>
      </div>
      <div className={styles.formGroup}>
        <h2 className={styles.label}>Email</h2>
        <span className={styles.inputContainer}>
          <Image src={Email} className={styles.icon} alt="email icon"></Image>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={handleEmailChange}
          />
        </span>
      </div>
      <div className={styles.formGroup}>
        <h2 className={styles.label}>Upload JSON file</h2>
        <label htmlFor="fileUpload" className={styles.fileUploadLabel}>
          <input
            type="file"
            id="fileUpload"
            accept=".json"
            style={{ display: "none" }}
            onChange={handleFileChange}
          />
          {isValidating ? (
            <div className={styles.validatingIcon}></div>
          ) : (
            <div className={styles.browseFileIcon}>
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="26" viewBox="0 0 22 26" fill="none">
                <path d="M20.7256 7.033L14.3862 0.754C13.9006 0.273 13.2312 0 12.5356 0H3.125C1.68125 0 0.513125 1.17 0.513125 2.6L0.5 23.4C0.5 24.83 1.66812 26 3.11187 26H18.875C20.3188 26 21.5 24.83 21.5 23.4V8.879C21.5 8.19 21.2244 7.527 20.7256 7.033ZM14.675 16.9H12.3125V20.8C12.3125 21.515 11.7219 22.1 11 22.1C10.2781 22.1 9.6875 21.515 9.6875 20.8V16.9H7.33813C6.7475 16.9 6.45875 16.198 6.87875 15.795L10.5538 12.168C10.8162 11.921 11.2231 11.921 11.4856 12.168L15.1475 15.795C15.5413 16.198 15.2525 16.9 14.675 16.9ZM13.625 9.1C12.9031 9.1 12.3125 8.515 12.3125 7.8V1.95L19.5312 9.1H13.625Z" fill="#4381FF" />
              </svg>
              Browse File
            </div>
          )}
        </label>
      </div>
      <div className={styles.formGroup}>
        <h2 className={styles.label}>File Contents</h2>
        <pre>{fileData}</pre>
      </div>
      <button
        type="submit"
        className={styles.submitButton}
        disabled={submitDisabled}
        onClick={handleSubmit}
      >
        Submit
      </button>
      {showSuccessModal && <SuccessModal onClose={handleCloseSuccessModal} />}
    </div>
  );
};

export default SubmitForm;
