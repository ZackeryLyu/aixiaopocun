import { FeedbackSubmission } from "../types";

/**
 * Handles the submission of user feedback.
 * 
 * CURRENTLY: Simulates an API call and logs to console.
 */
export const submitFeedback = async (data: FeedbackSubmission): Promise<boolean> => {
  // 1. Log to console
  console.group(`📝 New ${data.type.toUpperCase()} Submission`);
  console.log("Type:", data.type);
  if (data.toolName) console.log("Tool Name:", data.toolName);
  if (data.toolUrl) console.log("URL:", data.toolUrl);
  console.log("Description:", data.description);
  if (data.contact) console.log("Contact:", data.contact);
  console.log("Time:", new Date(data.timestamp).toLocaleString());
  console.groupEnd();

  // 3. Simulate Network Delay (1.5s)
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, 1500);
  });
};

/**
 * Generates a mailto link for manual submission via email client
 */
export const generateEmailLink = (data: FeedbackSubmission, receiverEmail: string = "aishiliuzi@163.com") => {
  let subjectPrefix = "";
  let bodyIntro = "";

  switch (data.type) {
    case 'report':
      subjectPrefix = "Report Issue (举报/纠错)";
      bodyIntro = "I would like to report an issue with a tool:";
      break;
    case 'general':
      subjectPrefix = "Feedback (反馈)";
      bodyIntro = "I have some feedback for AI Nexus:";
      break;
    case 'suggestion':
    default:
      subjectPrefix = "Suggestion (推荐工具)";
      bodyIntro = "I would like to suggest a new tool for AI Nexus:";
      break;
  }

  const subject = encodeURIComponent(`[AI Nexus] ${subjectPrefix}: ${data.toolName || 'General'}`);
  
  const body = encodeURIComponent(
`${bodyIntro}

${data.toolName ? `- Tool Name: ${data.toolName}` : ''}
${data.toolUrl ? `- URL: ${data.toolUrl}` : ''}
- Description/Message: 
${data.description}

${data.contact ? `- Contact Info: ${data.contact}` : ''}

Submitted at: ${new Date(data.timestamp).toLocaleString()}
`
  );

  return `mailto:${receiverEmail}?subject=${subject}&body=${body}`;
};