import { useTranslation } from 'react-i18next';

import { Modal } from '../../Generics/redesign/Modal/Modal';
import LineLabelSettings from '../../Generics/redesign/LabelSetting/LabelSettings';
import { Toggle } from '../../Generics/redesign/Toggle/Toggle';
import LanguageSelect from '../../LanguageSelect';
import { captionText, selectedThemeImage, themeImage } from './preferences.css';
import DarkModeThumbnail from '../../assets/images/artwork/DarkModeThumbnail.png';
import LightModeThumbnail from '../../assets/images/artwork/LightModeThumbnail.png';
import AutoDarkLightModeThumbnail from '../../assets/images/artwork/AutoDarkLightModeThumbnail.png';
import { lineKeyText } from '../../Generics/redesign/LabelSetting/labelSettingsSection.css';
import { HorizontalLine } from '../../Generics/redesign/HorizontalLine/HorizontalLine';

export type ThemeSetting = 'light' | 'dark' | 'auto';
export type Preference = 'theme' | 'isOpenOnStartup';
export interface PreferencesProps {
  isOpen: boolean;
  onClose: () => void;
  themeSetting?: ThemeSetting;
  isOpenOnStartup?: boolean;
  version?: string;
  onChange?: (preference: Preference, value: unknown) => void;
}

const Preferences = ({
  isOpen,
  onClose,
  themeSetting,
  isOpenOnStartup,
  version,
  onChange,
}: PreferencesProps) => {
  const { t } = useTranslation('genericComponents');

  const onClickTheme = (theme: ThemeSetting) => {
    if (onChange) {
      onChange('theme', theme);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      title={t('Preferences')}
      onClickCloseButton={onClose}
    >
      <span className={lineKeyText}>{t('Appearance')}</span>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          gap: 10,
          paddingBottom: 24,
        }}
      >
        {[
          {
            theme: 'auto',
            thumbnail: AutoDarkLightModeThumbnail,
            label: t('AutoFollowsComputerSetting'),
          },
          {
            theme: 'light',
            thumbnail: LightModeThumbnail,
            label: t('LightMode'),
          },
          {
            theme: 'dark',
            thumbnail: DarkModeThumbnail,
            label: t('DarkMode'),
          },
        ].map((themeDetails, index) => {
          const isSelected = themeSetting === themeDetails.theme;
          const imgClassNames = [themeImage];
          if (isSelected) {
            imgClassNames.push(selectedThemeImage);
          }
          return (
            <div
              key={themeDetails.theme}
              role="button"
              tabIndex={index}
              style={{ display: 'flex', flexDirection: 'column' }}
              onClick={() => onClickTheme(themeDetails.theme as ThemeSetting)}
              onKeyDown={() => onClickTheme(themeDetails.theme as ThemeSetting)}
            >
              <img
                src={themeDetails.thumbnail}
                alt={themeDetails.theme}
                className={imgClassNames.join(' ')}
              />
              <span className={captionText}>{themeDetails.label}</span>
            </div>
          );
        })}
      </div>
      <HorizontalLine />
      <LineLabelSettings
        items={[
          {
            sectionTitle: '',
            items: [
              {
                label: t('LaunchOnStartup'),
                value: (
                  <Toggle
                    checked={isOpenOnStartup}
                    onChange={(newValue) => {
                      if (onChange) {
                        onChange('isOpenOnStartup', newValue);
                      }
                    }}
                  />
                ),
              },
              {
                label: t('Language'),
                value: <LanguageSelect />,
              },
            ],
          },
        ]}
      />
      <span className={captionText}>NiceNode version {version}</span>
    </Modal>
  );
};

export default Preferences;