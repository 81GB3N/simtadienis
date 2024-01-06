import { useLanguage } from "./Languages";

export default function LanguageSelector() {
    const { locale, changeLocale } = useLanguage();
    const handleLanguageChange = (e) => {
        changeLocale(e.target.value);
    }
    return (
        <select onChange={handleLanguageChange} defaultValue={locale}>
            <option value="lt">Lithuanian</option>
            <option value="en">English</option>
        </select>
    )
}