// d:\Application\MyApp\monprojet\app\components\layout\quiz\Progress.tsx

interface ProgressProps {
    value: number;
    className?: string;
}

export default function Progress({ value, className = "" }: ProgressProps) {
    return (
        <div className={`w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700 overflow-hidden ${className}`}>
            <div 
                className="bg-orange-500 h-full rounded-full transition-all duration-500 ease-out shadow-[0_0_8px_rgba(249,115,22,0.4)]" 
                style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
            ></div>
        </div>
    );
}