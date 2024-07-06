export const formatDate = (inputDate: any) => {
  const date = new Date(inputDate);

  const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const weekday = weekdays[date.getUTCDay()];
  const day = date.getUTCDate();
  const month = months[date.getUTCMonth()];
  const year = date.getUTCFullYear();

  return `${weekday}, ${day} ${month} ${year}`;
};

export function convertTimeToHrs(starting: string, ending: string) {
  let startingTime = parseInt(starting);
  let endingTime = parseInt(ending);
  let hour;
  let minutes;

  const startMinutes = parseInt(starting?.split(":")[1]);
  const endMinutes = parseInt(ending?.split(":")[1]);

  if (startingTime > 12) {
    startingTime = startingTime - 12;
  }

  if (endingTime > 12) {
    endingTime = endingTime - 12;
  }
  if (startingTime < endingTime) {
    hour = endingTime - startingTime;
    console.log(starting);
  } else {
    hour = startingTime - endingTime;
  }

  if (startMinutes < endMinutes) {
    minutes = endMinutes - startMinutes;
    console.log(starting);
  } else {
    minutes = startMinutes - endMinutes;
  }

  return minutes !== 0 ? `${hour} h : ${minutes} m` : `${hour} h`;
}

export function createAbbreviation(word: string) {
  if (!word || typeof word !== "string") {
    return "";
  }

  if (word.length < 3) {
    return word.toUpperCase(); // If the word is too short, just return it in uppercase
  }

  const firstLetter = word[0];
  const middleLetter = word[Math.floor(word.length / 2)];
  const lastLetter = word[word.length - 1];

  return (firstLetter + middleLetter + lastLetter).toUpperCase();
}

export function formatBirthdayDate(dateString: string) {
  // Check if the input is a valid date string
  if (
    !dateString ||
    typeof dateString !== "string" ||
    !/^\d{4}-\d{2}-\d{2}$/.test(dateString)
  ) {
    return "Invalid date format";
  }

  // Split the input date string into its components
  const [year, month, day] = dateString.split("-");

  // Return the date in the desired format
  return `${day}/${month}/${year}`;
}

export function getNameAbb(name: string) {
  // Split the name into words
  const words = name.split(" ");

  // Map through each word and get the first letter, then join them together
  const initials = words.map((word) => word[0]).join("");

  // Return the initials in uppercase
  return initials.toUpperCase();
}

export function getThreeWordDate(dateString: string) {
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const dateObj = new Date(dateString);
  const dayOfWeekIndex = dateObj.getDay(); // Get the day of the week as an index (0-6)

  return daysOfWeek[dayOfWeekIndex];
}

export function formatDateToDDMMM(dateString: string) {
  const dateObj = new Date(dateString);
  const dayOfMonth = dateObj.getDate(); // Get the day of the month
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const monthIndex = dateObj.getMonth(); // Get the month as an index (0-11)

  // Format the date based on the length of the day of the month
  const formattedDate =
    dayOfMonth < 10
      ? `0${dayOfMonth} ${monthNames[monthIndex]}`
      : `${dayOfMonth} ${monthNames[monthIndex]}`;

  return formattedDate;
}
