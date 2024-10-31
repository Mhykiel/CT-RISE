# S.T.A.R for SeGOV Request Form

## **Situation**
In my role at the Department of Human Services within the Solution Management Division > Middleware Services > DevOps, I serve as the Lead Developer for SeGOV (Secure Government Operations), a cross-functional team tasked with managing secure file transfers across agencies. Our team oversees file transfers for critical programs, such as Medicaid, Medicare, Child Support Enforcement, and 20 other programs. Program Managers often request new file transfer setups for these programs, but until recently, we lacked a streamlined and efficient way for them to submit detailed requests.

In DevOps, our team operates with a dual-focus approach: front-end and back-end responsibilities. The front-end team handles help desk requests, ticket resolution, and coordinates User Acceptance Testing (UAT) in collaboration with our clients. Each quarter, we conduct a comprehensive codebase and backlog review, after which team members rotate between front-end and back-end roles to maintain continuity, and broaden skills.

### **Task**
As the lead developer, I was responsible for creating tools, workflows, and pipelines for unprecedented projects. This form aimed to allow Program Managers to submit complete, detailed requests for new data processing and file transfer tasks. To enable better integration into our DevOps CI/CD pipeline, we wanted the submitted data in JSON format, which could then be transformed into an XML schema for import into our MOVEit Managed File Transfer application servers.

### **Action**
I led the development of the SeGOV request form by taking the following steps:

1. **Form Design & Development**:
   - Designed an HTML template with JavaScript-based logic to capture input fields and guide users through completion.
   
2. **Data Transformation & Workflow Integration**:
   - Enabled JSON export and import functionality for the form, allowing data to be converted to XML and integrated with our MOVEit server.
   - Created internal tools to automate the transformation of JSON to XML schema, ensuring compatibility with downstream systems.

3. **Collaboration with CI/CD Pipeline**:
   - Developed the initial 80% of the form and successfully integrated it into our CI/CD pipeline. The form was then handed off to a Junior Developer, who coordinated with a sample group of Program Managers for User Acceptance Testing (UAT).
   - As Lead Developer my role shifted to be a spoke person for MSU and mentor for other developers when they ran into challenges.

4. **Cross-Functional Collaboration**:
   - Cooperated with the Network Admin, Server Admin, and junior developers to establish robust workflows for the form, ensuring it met both internal and client needs.

### **Result**
The SeGOV request form has dramatically improved how we handle file transfer requests. Key results include:

- **Efficient Request Processing**: Program Managers can now submit structured, JSON-formatted requests that integrate directly into our workflows, reducing manual data handling.
- **Enhanced Consistency and Accuracy**: By capturing all necessary details in one form, we minimized incomplete or inconsistent requests, leading to faster project starts.
- **Improved Collaboration**: The tool facilitated effective communication between our internal teams and Program Managers, streamlining UAT and encouraging smoother transitions during our quarterly DevOps rotation.
- **Foundation for Future Automation**: This form, with its JSON and XML integration, has become the basis for automating other file transfer requests, improving scalability and adaptability for future projects.
