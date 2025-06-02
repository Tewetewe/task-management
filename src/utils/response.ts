export function localizedResponse(
  data: any,
  messageId: string,
  messageEn: string,
  status_code = 200,
) {
  return {
    status_code,
    message: {
      id: messageId,
      en: messageEn,
    },
    data,
  };
}