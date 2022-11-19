import { useState } from "react";
import processing from "../ai-document/processing";
const dataProcess = async () => {
  const [formData, setFormData] = useState;
  try {
    const data = await processing();
    if (data) {
      setFormData(data);
    }

    return formData;
  } catch (e) {
    console.error(e);
  }
};

export default dataProcess;
