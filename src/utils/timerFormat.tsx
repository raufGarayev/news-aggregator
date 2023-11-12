export function formatRelativeTime(dateString: string) {
    const date = new Date(dateString);
    const now = new Date();
    
    let timeDifferenceInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if(timeDifferenceInSeconds < 0) timeDifferenceInSeconds = Math.abs(timeDifferenceInSeconds);

    if (timeDifferenceInSeconds < 60) {
      return `${timeDifferenceInSeconds}s`;
    } else if (timeDifferenceInSeconds < 3600) {
      const minutes = Math.floor(timeDifferenceInSeconds / 60);
      return `${minutes}m`;
    } else if (timeDifferenceInSeconds < 86400) {
      const hours = Math.floor(timeDifferenceInSeconds / 3600);
      return `${hours}h`;
    } else if (timeDifferenceInSeconds < 2592000) {
      const days = Math.floor(timeDifferenceInSeconds / 86400);
      return `${days}d`;
    } else if (timeDifferenceInSeconds < 31536000) {
      const months = Math.floor(timeDifferenceInSeconds / 2592000);
      return `${months}mo`;
    } else {
      return date.toLocaleString();
    }
}