'use client';

import React from 'react';
import ShareButton from './SocialShare';
import { useTranslations } from 'next-intl';

interface ShareContentProps {
  // Content-related props
  gameName: string;           // Name of the game being shared
  score?: number;             // User's score (if applicable)
  maxScore?: number;          // Maximum possible score
  percentage?: number;        // Percentage score (if applicable)
  achievements?: string[];    // Any achievements unlocked
  customMessage?: string;     // Custom message to include
  
  // Display-related props
  showStats?: boolean;        // Whether to display score statistics
  compact?: boolean;          // Compact or full display
  className?: string;         // Additional CSS classes
  buttonType?: 'primary' | 'neutral' | 'success';
  
  // URL-related props
  url?: string;               // URL to share (defaults to current URL)
  hashtags?: string[];        // Additional hashtags beyond the defaults
}

export default function ShareContent({
  gameName,
  score,
  maxScore,
  percentage,
  achievements = [],
  customMessage,
  showStats = true,
  compact = false,
  className = '',
  buttonType = 'primary',
  url,
  hashtags = []
}: ShareContentProps) {
  const t = useTranslations('Translations');
  
  // Calculate percentage if not provided but score and maxScore are
  const calculatedPercentage = percentage ?? 
    (score !== undefined && maxScore !== undefined && maxScore > 0) 
      ? Math.round((score! / maxScore!) * 100) 
      : undefined;
    
      const generateShareText = (): string => {
        // Start with the game name
        let text = t('sharePrefix') + ' ' + gameName + ' '; // No interpolation needed for sharePrefix
      
        // Add score information if available
        if (score !== undefined) {
          if (maxScore !== undefined) {
            text += t('scoreOutOf', { score, maxScore }); // Pass score and maxScore as TranslationValues
          } else {
            text += t('scoreOnly', { score }); // Pass score as TranslationValues
          }
      
          // Add percentage if available
          if (calculatedPercentage !== undefined) {
            text += ` (${calculatedPercentage}%)`;
          }
      
          text += '! ';
        }
      
        // Add achievements if any
        if (achievements.length > 0) {
          if (achievements.length === 1) {
            text += t('achievementSingle', { achievement: achievements[0] }) + ' '; // Pass achievement
          } else {
            text += t('achievementMultiple', { achievements: achievements.join(', ') }) + ' '; // Pass achievements
          }
        }
      
        // Add custom message if provided
        if (customMessage) {
          text += customMessage + ' ';
        }
      
        // Add call to action
        text += t('shareCallToAction'); // No interpolation needed for shareCallToAction
      
        return text;
      };
  
  const shareText = generateShareText();
  
  // Combine default hashtags with any additional ones
  const allHashtags = ['piromomo', 'nepal', ...hashtags];
  
  return (
    <div className={`${className} ${compact ? 'inline-block' : 'block w-full'}`}>
    {showStats && !compact && (
      <div className="mb-4 p-4 bg-gray-50 rounded-lg">
        <h3 className="text-lg font-medium text-gray-800 mb-2">
          {t('shareYourResults')} {/* No second argument */}
        </h3>

        {score !== undefined && (
          <div className="flex items-center mb-2">
            <span className="font-medium text-gray-600 mr-2">{t('score')}:</span> {/* No second argument */}
            <span className="font-bold text-blue-600">
              {score}
              {maxScore !== undefined && `/${maxScore}`}
              {calculatedPercentage !== undefined && ` (${calculatedPercentage}%)`}
            </span>
          </div>
        )}

        {achievements.length > 0 && (
          <div className="mb-2">
            <span className="font-medium text-gray-600 mr-2">{t('achievements')}:</span> {/* No second argument */}
            <div className="flex flex-wrap gap-2 mt-1">
              {achievements.map((achievement, index) => (
                <span
                  key={index}
                  className="inline-block bg-blue-100 text-blue-800 text-sm px-2 py-1 rounded-full"
                >
                  {achievement}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    )}

    <ShareButton
      url={url}
      text={shareText}
      hashtags={allHashtags}
      platforms={['twitter', 'facebook', 'whatsapp', 'copy']}
      placement={compact ? 'dropdown' : 'horizontal'}
      buttonType={buttonType}
      iconOnly={compact}
      className={compact ? '' : 'w-full'}
    />
    </div>
  );
}