import type { LanguageCode, SubtitleEntry } from './types';
export declare const loadSubtitles: (vttUrl: string) => Promise<SubtitleEntry[]>;
export interface VideoModalProps {
    visible: boolean;
    onClose: () => void;
    source: string | {
        [key: string]: string;
    };
    title?: string;
    autoPlay?: boolean;
    loop?: boolean;
    muted?: boolean;
    showControls?: boolean;
    showSkipButton?: boolean;
    autoCloseOnEnd?: boolean;
    isSubtitle?: boolean;
    subtitle: {
        [key: string]: string;
    };
    txtSkipButton?: string;
    txtCloseButton?: string;
    isRateControl?: boolean;
    initialSubtitle?: LanguageCode;
    isProgressBar?: boolean;
    refreshOnSubtitleChange?: boolean;
    isControlsMuted?: boolean;
    onError?: (error: any, loading: boolean) => void;
    onLoad?: (loading: boolean) => void;
    onEnd?: () => void;
    onProgress?: (progress: {
        currentTime: number;
        playableDuration: number;
        seekableDuration: number;
    }) => void;
    handleChangeSubtitleLanguage?: (language: LanguageCode) => void;
}
export declare const VideoModal: React.FC<VideoModalProps>;
//# sourceMappingURL=VideoModal.d.ts.map