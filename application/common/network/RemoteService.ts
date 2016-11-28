
/**
 * invoke a service
 *
 * @param serviceName name of the service
 * @param methodName method name
 * @param requestArguments list of arguments
 */
export async function invoke(serviceName: string, methodName: string, requestArguments: any[]) {

  const url = "/remote/" + serviceName + "/" + methodName;

  const requestInit: RequestInit = {
    method: "POST",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(requestArguments)
  };

  const result = await fetch(url, requestInit);

  if (!result.ok) {

    const data = await result.json();

    if (data && data.exception) {
      throw data.exception;
    } else {
      throw data;
    }
  }

  return await result.json()
}