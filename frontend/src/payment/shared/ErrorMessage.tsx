const ErrorMessage = ({ error }: { error: string | null }) => {
    if (!error) return null;

    const errorWithPeriod = error.endsWith('.') ? error : `${error}.`;

    return (
        <div className="flex flex-col gap-2 rounded bg-error-50 p-2">
            <h3 className="font-semibold text-error-500">Något gick fel!</h3>
            <p className="text-sm text-error-500">
                {errorWithPeriod} Om problemet kvarstår, vänligen{' '}
                <a
                    href="https://forms.gle/b1x6uWXeBK7LTxCh6"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="cursor-pointer underline"
                >
                    kontakta oss.
                </a>
            </p>
        </div>
    );
};
export default ErrorMessage;
