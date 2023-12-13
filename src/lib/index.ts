import { createClientAsync } from "soap";
import { toJson } from "xml2json";
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
    const endpoint = `https://${host}/Service/PXPCommunication.asmx`;

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
export function getFirstDayOfMonth(currentDate, endDate, dayOfWeek) {
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const dayIndex = daysOfWeek.findIndex(day => day === dayOfWeek);

    if (dayIndex === -1) {
        throw new Error('Invalid day of the week. Please provide a valid day like "Monday", "Tuesday", etc.');
    }

    const days = [];
    let currentDateObj = new Date(currentDate);
    const end = new Date(endDate);

    // Ensure we start at the beginning of the month
    currentDateObj.setDate(1);

    while (currentDateObj <= end) {
        // Move to the first occurrence of the day in the current month
        currentDateObj.setDate(1);
        while (currentDateObj.getDay() !== dayIndex) {
            currentDateObj.setDate(currentDateObj.getDate() + 1);
        }

        // Check if the date is within the range
        if (currentDateObj <= end) {
            days.push(new Date(currentDateObj));
        }

        // Move to the next month
        currentDateObj.setMonth(currentDateObj.getMonth() + 1);
    }

    return days;
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

export function encryptPassword(message) {
    let shift = 5;
    return message.replace(/[a-zA-Z]/g, c =>
        String.fromCharCode((c <= 'Z' ? 65 : 97) + (c.charCodeAt(0) - (c <= 'Z' ? 65 : 97) + shift) % 26)
    );

}

export function decryptPassword(encodedMessage) {
    let shift = 5;
    let unshift = (26 - shift) % 26;
    return encodedMessage.replace(/[a-zA-Z]/g, c =>
        String.fromCharCode((c <= 'Z' ? 65 : 97) + (c.charCodeAt(0) - (c <= 'Z' ? 65 : 97) + unshift) % 26)
    );
}
export function calculateWeighted(course) {
    let grade_offset = 0;
    if (course.type_of_class === "AP") {
        grade_offset = 1.0;
    }
    else if (course.type_of_class === "HON") {
        grade_offset = 0.5;
    }
    let roundedGrade = Math.round(course.grade);
    let gpa = 0;

    if (roundedGrade >= 97) {
        gpa = 4.5;
    } else if (roundedGrade >= 90) {
        gpa = 4;
    } else if (roundedGrade >= 86) {
        gpa = 3.5;
    } else if (roundedGrade >= 80) {
        gpa = 3;
    } else if (roundedGrade >= 76) {
        gpa = 2.5;
    } else if (roundedGrade >= 70) {
        gpa = 2;
    } else if (roundedGrade >= 66) {
        gpa = 1.5;
    } else if (roundedGrade >= 60) {
        gpa = 1;
    } else {
        gpa = 0;
    }
    gpa += grade_offset;
    return gpa
}
export function calculateUnweighted(course) {
    let grade = Math.round(course.grade);
    let gpa = 0;

    if (grade >= 97) {
        gpa = 4.0;
    } else if (grade >= 94) {
        gpa = 4.0;
    } else if (grade >= 90) {
        gpa = 3.7;
    } else if (grade >= 87) {
        gpa = 3.3;
    } else if (grade >= 84) {
        gpa = 3.0;
    } else if (grade >= 80) {
        gpa = 2.7;
    } else if (grade >= 77) {
        gpa = 2.3;
    } else if (grade >= 74) {
        gpa = 2.0;
    } else if (grade >= 70) {
        gpa = 1.7;
    } else if (grade >= 67) {
        gpa = 1.3;
    } else if (grade >= 64) {
        gpa = 1.0;
    } else if (grade >= 60) {
        gpa = 0.7;
    } else {
        gpa = 0.0;
    }
    return gpa
}