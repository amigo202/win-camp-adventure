
/**
 * Service for running Python code
 */
export const runPythonCode = (code: string): { url: string, message: string } => {
  try {
    const encodedCode = encodeURIComponent(code);
    const pythonTutorUrl = `https://pythontutor.com/visualize.html#code=${encodedCode}&cumulative=false&curInstr=0&heapPrimitives=nevernest&mode=display&origin=opt-frontend.js&py=3&rawInputLstJSON=%5B%5D&textReferences=false`;
    
    return {
      url: pythonTutorUrl,
      message: "הקוד נפתח במערכת חיצונית בחלון חדש. המערכת מאפשרת לראות בצורה ויזואלית איך הקוד רץ, צעד אחר צעד."
    };
  } catch (error) {
    return {
      url: "",
      message: "אירעה שגיאה בהרצת הקוד. אנא נסו שוב מאוחר יותר."
    };
  }
};
