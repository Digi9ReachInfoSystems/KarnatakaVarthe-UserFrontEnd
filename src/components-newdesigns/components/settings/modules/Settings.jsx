import React, { useContext, useState, useEffect } from 'react'
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
    const {language} = useContext(LanguageContext);
    const { showSuccess, showError } = useToast();
    const [userData , setUserData] = useState(null);
    const userId = Cookies.get("userId");
    console.log("User ID:", userId);

    // Check for phoneNumber and email in cookies
    const phoneNumberFromCookie = Cookies.get("phoneNumber");
    const emailFromCookie = Cookies.get("email");
    
    // Determine which field should be disabled
    const hasPhoneNumber = !!phoneNumberFromCookie;
    const hasEmail = !!emailFromCookie;

    // Initialize state with empty values
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

    // Assuming we have a way to fetch user data, we can use useEffect to fetch initial data
    // For now, we'll leave it empty, but you might want to fetch data from an API or another source
    useEffect(() => {
        const fetchUserData = async () => {
          const res = await getUserById(userId); 
          console.log("Fetched User Data:", res);
          if (res){
            setUserData(res);
            // Extract last 10 digits from phone number
            const phoneNumber = res.data.phone_Number || "";
            const last10Digits = String(phoneNumber).replace(/\D/g, '').slice(-10);
            
            setFormData({
                displayName: res.data.displayName || "",
                phone_Number: last10Digits,
                email: res.data.email || ""
            });
            setOriginalData({
                displayName: res.data.displayName || "",
                phone_Number: last10Digits,
                email: res.data.email || ""
            });
          }
        }

        fetchUserData();
    }, []);

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const validatePhone = (phone) => {
        const phoneRegex = /^[0-9]{10}$/;
        return phoneRegex.test(phone.replace(/[\s-]/g, ''));
    };

    const handleChange = (e) => {
        const { name, value } = e.target;

        // Restrict phone number to max 10 digits and only numbers
        if (name === 'phone_Number') {
            const numericValue = value.replace(/\D/g, ''); // Remove non-numeric characters
            if (numericValue.length <= 10) {
                setFormData(prev => ({
                    ...prev,
                    [name]: numericValue
                }));
            }
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

        // If phone number is not in cookies (not disabled), validate it
        if (!hasPhoneNumber) {
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

        // If email is not in cookies (not disabled), validate it
        if (!hasEmail) {
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

        // If both phone and email exist in cookies, validate if user tries to update them
        if (hasPhoneNumber && formData.email.trim() && !validateEmail(formData.email)) {
            newErrors.email = language === 'English' ? 'Invalid email format' :
                             language === 'Kannada' ? 'ಅಮಾನ್ಯ ಇಮೇಲ್ ಸ್ವರೂಪ' :
                             'अमान्य ईमेल प्रारूप';
        }
        
        if (hasEmail && formData.phone_Number.trim() && !validatePhone(formData.phone_Number)) {
            newErrors.phone_Number = language === 'English' ? 'Invalid phone number (10 digits required)' :
                             language === 'Kannada' ? 'ಅಮಾನ್ಯ ದೂರವಾಣಿ ಸಂಖ್ಯೆ (10 ಅಂಕೆಗಳು ಅಗತ್ಯವಿದೆ)' :
                             'अमान्य फ़ोन नंबर (10 अंक आवश्यक)';
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
            // Assuming we have a user ID from somewhere else
            const firebase = Cookies.get("firebaseUID");
            const res = await UpdateUserDetailsApi(firebase, {
                displayName: formData.displayName,
                phone_Number: formData.phone_Number,
                email: formData.email
            });

            if(res) {
                setOriginalData(formData);
                showSuccess(
                    language === 'English' ? 'Success' :
                    language === 'Kannada' ? 'ಯಶಸ್ವಿ' :
                    'सफलता',
                    language === 'English' ? 'Your contact details have been updated successfully' :
                    language === 'Kannada' ? 'ನಿಮ್ಮ ಸಂಪರ್ಕ ವಿವರಗಳನ್ನು ಯಶಸ್ವಿಯಾಗಿ ನವೀಕರಿಸಲಾಗಿದೆ' :
                    'आपके संपर्क विवरण सफलतापूर्वक अपडेट किए गए हैं'
                );
                // Remove cookie update logic
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
                            {PhoneText[language]}
                        </SettingsLabel>
                        <SettingsInput
                            type="tel"
                            id="phone_Number"
                            name="phone_Number"
                            value={formData.phone_Number}
                            onChange={handleChange}
                            placeholder={language === 'English' ? 'Enter your phone number' :
                                       language === 'Kannada' ? 'ನಿಮ್ಮ ದೂರವಾಣಿ ಸಂಖ್ಯೆಯನ್ನು ನಮೂದಿಸಿ' :
                                       'अपना फ़ोन नंबर दर्ज करें'}
                            hasError={!!errors.phone_Number}
                            disabled={hasEmail}
                        />
                        {errors.phone_Number && <ErrorText>{errors.phone_Number}</ErrorText>}
                    </SettingsItem>
                    <SettingsItem>
                        <SettingsLabel htmlFor="email">
                            {EmailText[language]}
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
                            disabled={hasPhoneNumber}
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
    )
}

export default Settings
