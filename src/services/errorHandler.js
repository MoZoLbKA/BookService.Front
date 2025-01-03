/**
 * Преобразует объект ошибок сервера в читаемый массив сообщений.
 * @param {Object} errorData - Объект ошибок от сервера.
 * @returns {string[]} - Массив сообщений об ошибках.
 */
export const parseServerErrors = (errorData) => {
  if (!errorData || typeof errorData !== 'object') return ['Неизвестная ошибка.'];

  return Object.entries(errorData).flatMap(([field, messages]) => 
    Array.isArray(messages) ? messages : [messages]
  );
};