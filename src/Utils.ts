export function formatVietnameseDatetime(timestamp: number) {
    const date = new Date(timestamp * 1000);

    // Format the date parts
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    // Format the time parts
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    // Combine to the desired format
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

export const TONG_HOP = "Tổng hợp"