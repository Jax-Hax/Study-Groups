declare global {
	namespace App {
	  interface Locals {
		formData: FormData
		getGrades: () => Promise<any>
	  }
	}
  }
  
  export {}
  