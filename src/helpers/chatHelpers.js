export function convertDateAndTime(date) {
    return new Date(date).toLocaleString('en-US', {
        hour: 'numeric',
        minute: 'numeric',
        hour12: true,
        month: 'short',
        day: 'numeric',
    });
}
export function convertMessageToShortName(message) {
    const maxLength = 12;
    if (message.length <= maxLength) {
        return message;
    } else {
        const extension = message.substring(message.lastIndexOf('.'));
        return (
            message.substring(0, maxLength - extension.length - 3) +
            '...' +
            extension
        );
    }
}
