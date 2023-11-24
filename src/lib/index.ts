import { createClientAsync } from "soap";
import { toJson} from "xml2json";
class StudentVueClient {
    username;
    password;
    client;
    constructor(username: string, password: string, client: any) {
        this.username = username;
        this.password = password;

        this.client = client;
    }

    getMessages() {
        return this._xmlJsonSerialize(this._makeServiceRequest('GetPXPMessages'));
    }

    getCalendar() {
        return this._xmlJsonSerialize(this._makeServiceRequest('StudentCalendar'));
    }

    getAttendance() {
        return this._xmlJsonSerialize(this._makeServiceRequest('Attendance'));
    }

    getGradebook(reportPeriod: any) {
        let params = {};
        if (typeof reportPeriod !== 'undefined') {
            params.ReportPeriod = reportPeriod;
        }
        return this._xmlJsonSerialize(this._makeServiceRequest('Gradebook', params));
    }

    getClassNotes() {
        return this._xmlJsonSerialize(this._makeServiceRequest('StudentHWNotes'));
    }

    getStudentInfo() {
        return this._xmlJsonSerialize(this._makeServiceRequest('StudentInfo'));
    }

    getSchedule(termIndex: any) {
        let params = {};
        if (typeof termIndex !== 'undefined') {
            params.TermIndex = termIndex;
        }
        return this._xmlJsonSerialize(this._makeServiceRequest('StudentClassList', params));
    }

    getSchoolInfo() {
        return this._xmlJsonSerialize(this._makeServiceRequest('StudentSchoolInfo'));
    }

    listReportCards() {
        return this._xmlJsonSerialize(this._makeServiceRequest('GetReportCardInitialData'));
    }

    getReportCard(documentGuid: any) {
        return this._xmlJsonSerialize(this._makeServiceRequest('GetReportCardDocumentData', { DocumentGU: documentGuid }));
    }

    listDocuments() {
        return this._xmlJsonSerialize(this._makeServiceRequest('GetStudentDocumentInitialData'));
    }

    getDocument(documentGuid: any) {
        return this._xmlJsonSerialize(this._makeServiceRequest('GetContentOfAttachedDoc', { DocumentGU: documentGuid }));
    }

    async _xmlJsonSerialize(servicePromise: Promise<any>) {
        const result = await servicePromise;
        return toJson(result[0].ProcessWebServiceRequestResult);
    }

    _makeServiceRequest(methodName: string, params = {}, serviceHandle = 'PXPWebServices') {
        let paramStr = '&lt;Parms&gt;';
        Object.entries(params).forEach(([key, value]) => {
            paramStr += '&lt;' + key + '&gt;';
            paramStr += value;
            paramStr += '&lt;/' + key + '&gt;';
        });
        paramStr += '&lt;/Parms&gt;';

        return this.client.ProcessWebServiceRequestAsync({
            userID: this.username,
            password: this.password,
            skipLoginLog: 1,
            parent: 0,
            webServiceHandleName: serviceHandle,
            methodName,
            paramStr
        });
    }
}

export async function login(url: string | URL, username: string, password: string, soapOptions = {}) {
    const host = new URL(url).host;
    const endpoint = `https://${ host }/Service/PXPCommunication.asmx`;

    const resolvedOptions = Object.assign({
        endpoint: endpoint, // enforces https
        escapeXML: false
    }, soapOptions);

    const wsdlURL = endpoint + '?WSDL';

    const client = await createClientAsync(wsdlURL, resolvedOptions);
    return new StudentVueClient(username, password, client);
}

export async function getDistrictUrls(zipCode: any) {
    const client = await createClientAsync('https://support.edupoint.com/Service/HDInfoCommunication.asmx?WSDL', {
        endpoint: 'https://support.edupoint.com/Service/HDInfoCommunication.asmx',
        escapeXML: false
    });
    const supportClient = new StudentVueClient('EdupointDistrictInfo', 'Edup01nt', client);
    return await supportClient._xmlJsonSerialize(supportClient._makeServiceRequest('GetMatchingDistrictList', {
        MatchToDistrictZipCode: zipCode,
        Key: '5E4B7859-B805-474B-A833-FDB15D205D40'
    }, 'HDInfoServices'));
}
function getFirstXOfMonth(year, months) {
  const firstWednesdays = [];
  months.forEach(month => {
    const date = new Date(year, month - 1, 1); // Subtract 1 from month as months are zero-indexed
    while (date.getDay() !== 3) { // Wednesday has index 3 (0-indexed)
      date.setDate(date.getDate() + 1);
    }
    firstWednesdays.push(date.toDateString());
  });
  return firstWednesdays;
  /*
const year = 2023;
const months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]; // January to December
const firstWednesdays = getFirstWednesdays(year, months);
  */
}
export function getDaysOfWeek(currentDate, endDate, dayOfWeek) {
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const dayIndex = daysOfWeek.findIndex(day => day === dayOfWeek);
  
    if (dayIndex === -1) {
      throw new Error('Invalid day of the week. Please provide a valid day like "Monday", "Tuesday", etc.');
    }
  
    const days = [];
    let currentDateObj = new Date(currentDate);
    const end = new Date(endDate);
  
    // Get the difference in days between the current day and the target day
    let diff = (dayIndex + 7 - currentDateObj.getDay()) % 7;
  
    // Adjust the current date to the first occurrence of the target day
    currentDateObj.setDate(currentDateObj.getDate() + diff);
  
    // Loop to get all occurrences of the target day
    while (currentDateObj <= end) {
      days.push(new Date(currentDateObj));
      currentDateObj.setDate(currentDateObj.getDate() + 7);
    }
  
    return days;
  }
