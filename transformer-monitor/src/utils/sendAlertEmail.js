import emailjs from "emailjs-com";

export const sendAlertEmail = async (data) => {
  const templateParams = {
    transformer_id: data.transformerId,
    temperature: data.temperature,
    oil_level: data.oilLevel,
    load: data.load,
    timestamp: new Date().toLocaleString(),
  };

  try {
    await emailjs.send(
      "service_kv0qhpt",      // Replace with actual service ID
      "template_50ff141",     // Replace with actual template ID
      templateParams,
      "bxkBpsqoXpMVV1tap"       // Replace with your public key
    );
    console.log("✅ Alert email sent.");
  } catch (error) {
    console.error("❌ Failed to send alert email:", error);
  }
};
