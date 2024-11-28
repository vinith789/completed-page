async function fetchDepartmentData() {
  try {
    const response = await fetch('/data/departments.json');
    if (!response.ok) throw new Error('Failed to load department data.');
    return await response.json();
  } catch (error) {
    console.error('Error fetching department data:', error);
    return []; // Return empty data on error to prevent crashes
  }
}

export default fetchDepartmentData;
