import React, { useContext, useState, useEffect } from 'react';
import { LanguageContext } from '../../../../context/LanguageContext';
import { useToast } from '../../../../context/ToastContext';
import {
    SettingsContainer,
    SettingsTitle,
    SettingsForm,
    SettingsSection,
    SettingsItem,
    SettingsLabel,
    SettingsInput,
    SaveButton,
    CancelButton,
    ButtonGroup,
    ErrorText
} from '../Settings.Style';
import Cookies from 'js-cookie';
import { UpdateUserDetailsApi } from '../../../../services/auth/LoginApi';
import { getUserById } from '../../../../services/auth/SignupApi';

const TitleText = {
    English: "Settings",
    Kannada: "ಸೆಟ್ಟಿಂಗ್‌ಗಳು",
    Hindi: "सेटिंग्स"
};

const ContactDetailsText = {
    English: "Contact Details",
    Kannada: "ಸಂಪರ್ಕ ವಿವರಗಳು",
    Hindi: "संपर्क विवरण"
};

const NameText = {
    English: "Name",
    Kannada: "ಹೆಸರು",
    Hindi: "नाम"
};

const PhoneText = {
    English: "Phone Number",
    Kannada: "ದೂರವಾಣಿ ಸಂಖ್ಯೆ",
    Hindi: "फ़ोन नंबर"
};

const EmailText = {
    English: "Email",
    Kannada: "ಇಮೇಲ್",
    Hindi: "ईमेल"
};

const SaveText = {
    English: "Save Changes",
    Kannada: "ಬದಲಾವಣೆಗಳನ್ನು ಉಳಿಸಿ",
    Hindi: "परिवर्तन सहेजें"
};

const CancelText = {
    English: "Cancel",
    Kannada: "ರದ್ದುಮಾಡಿ",
    Hindi: "रद्द करें"
};

function Settings() {
    const { language } = useContext(LanguageContext);
    const { showSuccess, showError } = useToast();
    const [userData, setUserData] = useState(null);
    const [formData, setFormData] = useState({
        displayName: "",
        phone_Number: "",
        email: ""
    });
    const [originalData, setOriginalData] = useState({
        displayName: "",
        phone_Number: "",
        email: ""
    });
    const [errors, setErrors] = useState({
        displayName: '',
        phone_Number: '',
        email: ''
    });
    const [isLoading, setIsLoading] = useState(false);

    const userId = Cookies.get("userId");
    const phoneNumberFromCookie = Cookies.get("Phone");
    const emailFromCookie = Cookies.get("Email");

        const isPhoneDisabled = !!phoneNumberFromCookie;
        const isEmailDisabled = !!emailFromCookie; 

    useEffect(() => {
        const fetchUserData = async () => {
            const res = await getUserById(userId);
            if (res) {
                const phoneNumber = res.data.phone_Number || "";
                const last10Digits = String(phoneNumber).replace(/\D/g, '').slice(-10);
                const formattedPhone = last10Digits ? `+91${last10Digits}` : "";

                setFormData({
                    displayName: res.data.displayName || "",
                    phone_Number: formattedPhone,
                    email: res.data.email || ""
                });
                setOriginalData({
                    displayName: res.data.displayName || "",
                    phone_Number: formattedPhone,
                    email: res.data.email || ""
                });
            }
        };
        fetchUserData();
    }, [userId]);

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const validatePhone = (phone) => {
        const phoneDigits = phone.replace(/^\+91/, '').replace(/[\s-]/g, '');
        const phoneRegex = /^[0-9]{10}$/;
        return phoneRegex.test(phoneDigits);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'phone_Number' && isPhoneDisabled) return;
        if (name === 'email' && isEmailDisabled) return;

        if (name === 'phone_Number') {
            let numericValue = value.replace(/[^\d+]/g, '');
            if (!numericValue.startsWith('+91')) {
                numericValue = '+91' + numericValue.replace(/^\+91/, '').replace(/\+/g, '');
            }
            const digits = numericValue.replace(/^\+91/, '');
            if (digits.length <= 10) {
                numericValue = '+91' + digits;
            }
            setFormData(prev => ({
                ...prev,
                [name]: numericValue
            }));
        } else {
            setFormData(prev => ({
                ...prev,
                [name]: value
            }));
        }

        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.displayName.trim()) {
            newErrors.displayName = language === 'English' ? 'Name is required' :
                            language === 'Kannada' ? 'ಹೆಸರು ಅಗತ್ಯವಿದೆ' :
                            'नाम आवश्यक है';
        }

        if (!isPhoneDisabled) {
            if (!formData.phone_Number.trim()) {
                newErrors.phone_Number = language === 'English' ? 'Phone number is required' :
                                 language === 'Kannada' ? 'ದೂರವಾಣಿ ಸಂಖ್ಯೆ ಅಗತ್ಯವಿದೆ' :
                                 'फ़ोन नंबर आवश्यक है';
            } else if (!validatePhone(formData.phone_Number)) {
                newErrors.phone_Number = language === 'English' ? 'Invalid phone number (10 digits required)' :
                                 language === 'Kannada' ? 'ಅಮಾನ್ಯ ದೂರವಾಣಿ ಸಂಖ್ಯೆ (10 ಅಂಕೆಗಳು ಅಗತ್ಯವಿದೆ)' :
                                 'अमान्य फ़ोन नंबर (10 अंक आवश्यक)';
            }
        }

        if (!isEmailDisabled) {
            if (!formData.email.trim()) {
                newErrors.email = language === 'English' ? 'Email is required' :
                                 language === 'Kannada' ? 'ಇಮೇಲ್ ಅಗತ್ಯವಿದೆ' :
                                 'ईमेल आवश्यक है';
            } else if (!validateEmail(formData.email)) {
                newErrors.email = language === 'English' ? 'Invalid email format' :
                                 language === 'Kannada' ? 'ಅಮಾನ್ಯ ಇಮೇಲ್ ಸ್ವರೂಪ' :
                                 'अमान्य ईमेल प्रारूप';
            }
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) {
            return;
        }
        setIsLoading(true);
        try {
            const firebase = Cookies.get("firebaseUID");
            const phoneToSend = formData.phone_Number.replace(/^\+/, '');
            const res = await UpdateUserDetailsApi(firebase, {
                displayName: formData.displayName,
                phone_Number: phoneToSend,
                email: formData.email
            });
            if (res) {
                setOriginalData(formData);
                showSuccess(
                    language === 'English' ? 'Success' :
                    language === 'Kannada' ? 'ಯಶಸ್ವಿ' :
                    'सफलता',
                    language === 'English' ? 'Your contact details have been updated successfully' :
                    language === 'Kannada' ? 'ನಿಮ್ಮ ಸಂಪರ್ಕ ವಿವರಗಳನ್ನು ಯಶಸ್ವಿಯಾಗಿ ನವೀಕರಿಸಲಾಗಿದೆ' :
                    'आपके संपर्क विवरण सफलतापूर्वक अपडेट किए गए हैं'
                );
            }
        } catch (error) {
            console.error('Error saving data:', error);
            showError(
                language === 'English' ? 'Error' :
                language === 'Kannada' ? 'ದೋಷ' :
                'त्रुटि',
                language === 'English' ? 'Failed to update contact details' :
                language === 'Kannada' ? 'ಸಂಪರ್ಕ ವಿವರಗಳನ್ನು ನವೀಕರಿಸಲು ವಿಫಲವಾಗಿದೆ' :
                'संपर्क विवरण अपडेट करने में विफल'
            );
        } finally {
            setIsLoading(false);
        }
    };

    const handleCancel = () => {
        setFormData(originalData);
        setErrors({
            displayName: '',
            phone_Number: '',
            email: ''
        });
    };

    const hasChanges = JSON.stringify(formData) !== JSON.stringify(originalData);

    return (
        <SettingsContainer>
            <SettingsTitle>{TitleText[language]}</SettingsTitle>
            <SettingsForm onSubmit={handleSubmit}>
                <SettingsSection>
                    <SettingsTitle style={{ fontSize: '20px', marginBottom: '20px' }}>
                        {ContactDetailsText[language]}
                    </SettingsTitle>
                    <SettingsItem>
                        <SettingsLabel htmlFor="displayName">
                            {NameText[language]} <span style={{ color: 'red' }}>*</span>
                        </SettingsLabel>
                        <SettingsInput
                            type="text"
                            id="displayName"
                            name="displayName"
                            value={formData.displayName}
                            onChange={handleChange}
                            placeholder={language === 'English' ? 'Enter your name' :
                                       language === 'Kannada' ? 'ನಿಮ್ಮ ಹೆಸರನ್ನು ನಮೂದಿಸಿ' :
                                       'अपना नाम दर्ज करें'}
                            hasError={!!errors.displayName}
                        />
                        {errors.displayName && <ErrorText>{errors.displayName}</ErrorText>}
                    </SettingsItem>
                    <SettingsItem>
                        <SettingsLabel htmlFor="phone_Number">
                            {PhoneText[language]} {!isPhoneDisabled && <span style={{ color: 'red' }}>*</span>}
                        </SettingsLabel>
                        <SettingsInput
                            type="tel"
                            id="phone_Number"
                            name="phone_Number"
                            value={formData.phone_Number}
                            onChange={handleChange}
                            placeholder={language === 'English' ? '+91XXXXXXXXXX' :
                                       language === 'Kannada' ? '+91XXXXXXXXXX' :
                                       '+91XXXXXXXXXX'}
                            hasError={!!errors.phone_Number}
                            disabled={isPhoneDisabled}
                          
                        />
                        {errors.phone_Number && <ErrorText>{errors.phone_Number}</ErrorText>}
                    </SettingsItem>
                    <SettingsItem>
                        <SettingsLabel htmlFor="email">
                            {EmailText[language]} {!isEmailDisabled && <span style={{ color: 'red' }}>*</span>}
                        </SettingsLabel>
                        <SettingsInput
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder={language === 'English' ? 'Enter your email' :
                                       language === 'Kannada' ? 'ನಿಮ್ಮ ಇಮೇಲ್ ಅನ್ನು ನಮೂದಿಸಿ' :
                                       'अपना ईमेल दर्ज करें'}
                            hasError={!!errors.email}
                            disabled={isEmailDisabled}
                         
                        />
                        {errors.email && <ErrorText>{errors.email}</ErrorText>}
                    </SettingsItem>
                    <ButtonGroup>
                        <SaveButton
                            type="submit"
                            disabled={isLoading || !hasChanges}
                        >
                            {isLoading ? (language === 'English' ? 'Saving...' :
                                         language === 'Kannada' ? 'ಉಳಿಸಲಾಗುತ್ತಿದೆ...' :
                                         'सहेजा जा रहा है...') :
                            SaveText[language]}
                        </SaveButton>
                        <CancelButton
                            type="button"
                            onClick={handleCancel}
                            disabled={isLoading || !hasChanges}
                        >
                            {CancelText[language]}
                        </CancelButton>
                    </ButtonGroup>
                </SettingsSection>
            </SettingsForm>
        </SettingsContainer>
    );
}

export default Settings;
