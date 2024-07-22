"use client";
import CourseItem from "@/components/trainings/course-item";
import Training from "@/lib/models/Training";
import { Op } from "sequelize";
import AdminFormTable from "@/components/forms/admin-form-table";
import { getAllAdminForms } from "@/lib/models/AdminForm";
import AdminFormItem from "../../../../ui/forms/admin-form-item";
import { Button, Tab, Tabs } from "@nextui-org/react";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import placeholderMan from "public/placeholder/Placeholder-Man.jpg";
// autoTable
// // immport jsPDF

// function generatePDF() {
//   // const { jsPDF } = window.jspdf;
//   const doc = new jsPDF();

//   // Sample data
//   const data = [
//     // ["Learning and Development Participation Request Form"],
//     ["ID", "Name", "Country"],
//     ["1", "John Doe", "USA"],
//     ["2", "Anna Smith", "UK"],
//     ["3", "Peter Jones", "Canada"],
//   ];

//   doc.autoTable({
//     head: [data[0]],
//     body: data.slice(1),
//   });

//   doc.save("table.pdf");
// }

function generatePDF() {
  // const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  // Load the first image
  const img1 = new Image();
  img1.src = placeholderMan.src; // Replace with your first image URL
  img1.onload = function () {
    // Add the first image to the PDF
    doc.addImage(img1, "JPEG", 10, 10, 180, 160);

    // Load the second image
    const img2 = new Image();
    img2.src = placeholderMan.src; // Replace with your second image URL
    img2.onload = function () {
      // Overlay the second image on the PDF
      doc.addImage(img2, "PNG", 50, 50, 100, 80);

      // Optionally add text over the images
      doc.setFontSize(20);
      doc.setTextColor(255, 0, 0); // Red text
      doc.text("Overlay Text 1", 60, 60);

      doc.setFontSize(16);
      doc.setTextColor(0, 255, 0); // Green text
      doc.text("Overlay Text 2", 60, 80);

      doc.save("image-overlay.pdf");
    };
  };
}

export default function Layout({
  adminformtable,
  idpformtable,
}: {
  adminformtable: React.ReactNode;
  idpformtable: React.ReactNode;
}) {
  return (
    <div>
      <div className='flex flex-col h-full'>
        <Tabs>
          <Tab key='IDP' title='IDP Forms'>
            {idpformtable}
          </Tab>
          <Tab key='ADMINFORM' title='L&D Forms'>
            {adminformtable}
          </Tab>
        </Tabs>
      </div>
      {/* <div>
        <Button onClick={generatePDF}>OPEN TEST PDF FILE</Button>
      </div> */}
    </div>
  );
}
