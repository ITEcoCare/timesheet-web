const tempStatus =(isi)=> {
  return (
    isi == "Active" 
    ? (
      <span className="inline-flex items-center gap-1 rounded-full bg-green-50 dark:bg-green-600 px-2 py-1 text-xs font-semibold text-green-600 dark:text-green-50">
        <span className="h-1.5 w-1.5 rounded-full bg-green-600 dark:bg-green-50"></span>
        {isi}
      </span>
    ) : (
      <span className="inline-flex items-center gap-1 rounded-full bg-red-50 dark:bg-red-600 px-2 py-1 text-xs font-semibold text-red-600 dark:text-red-50">
        <span className="h-1.5 w-1.5 rounded-full bg-red-600 dark:bg-red-50"></span>
        {isi}
      </span>
    )
  )
}

export const getData = () => [
  {
    name: "Rudy Cooper",
    age: 27,
    email: "rudy.cooper@ecocare.co.id",
    title: "Regional Paradigm Technician",
    department: "Optimization",
    status: tempStatus("Active"),
    role: "Admin",
    imgUrl:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60",
  },
  {
    name: "Angga Fisher",
    age: 25,
    email: "angga.fisher@ecocare.co.id",
    title: "Product Directives Officer",
    department: "Intranet",
    status: tempStatus("Active"),
    role: "Owner",
    imgUrl:
      "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60",
  },
  {
    name: "Raka Howhow",
    age: 20,
    email: "raka.howhow@ecocare.co.id",
    title: "Forward Response Developer",
    department: "Directives",
    status: tempStatus("Active"),
    role: "Member",
    imgUrl:
      "https://images.unsplash.com/photo-1520813792240-56fc4a3765a7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60",
  },
  {
    name: "Ridwan Wilson",
    age: 20,
    email: "ridwan.wilson@ecocare.co.id",
    title: "Central Security Manager",
    department: "Program",
    status: tempStatus("Active"),
    role: "Member",
    imgUrl:
      "https://images.unsplash.com/photo-1498551172505-8ee7ad69f235?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60",
  },
  {
    name: "Klontong Watson",
    age: 21,
    email: "klontong.watson@ecocare.co.id",
    title: "Lean Implementation Liaison",
    department: "Mobility",
    status: tempStatus("Active"),
    role: "Admin",
    imgUrl:
      "https://images.unsplash.com/photo-1532417344469-368f9ae6d187?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60",
  },
  {
    name: "Cameron Williamson",
    age: 18,
    email: "cameron.williamson@ecocare.co.id",
    title: "Internal Applications Engineer",
    department: "Security",
    status: tempStatus("Active"),
    role: "Member",
    imgUrl:
      "https://images.unsplash.com/photo-1566492031773-4f4e44671857?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60",
  },
  {
    name: "Jane Cooper",
    age: 27,
    email: "jane.cooper@ecocare.co.id",
    title: "Regional Paradigm Technician",
    department: "Optimization",
    status: tempStatus("Inactive"),
    role: "Admin",
    imgUrl:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60",
  },
  {
    name: "Cody Fisher",
    temp: '12345',
    age: 25,
    email: "cody.fisher@ecocare.co.id",
    title: "Product Directives Officer",
    department: "Intranet",
    status: tempStatus("Active"),
    role: "Owner",
    imgUrl:
      "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60",
  },
  {
    name: "Esther Howard",
    age: 20,
    email: "esther.howard@ecocare.co.id",
    title: "Forward Response Developer",
    department: "Directives",
    status: tempStatus("Inactive"),
    role: "Member",
    imgUrl:
      "https://images.unsplash.com/photo-1520813792240-56fc4a3765a7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60",
  },
  {
    name: "Jenny Wilson",
    age: 20,
    email: "jenny.wilson@ecocare.co.id",
    title: "Central Security Manager",
    department: "Program",
    status: tempStatus("Active"),
    role: "Member",
    imgUrl:
      "https://images.unsplash.com/photo-1498551172505-8ee7ad69f235?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60",
  },
  {
    name: "Kristin Watson",
    age: 21,
    email: "kristin.watson@ecocare.co.id",
    title: "Lean Implementation Liaison",
    department: "Mobility",
    status: tempStatus("Active"),
    role: "Admin",
    imgUrl:
      "https://images.unsplash.com/photo-1532417344469-368f9ae6d187?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60",
  },
  {
    name: "Cameron Williamson",
    age: 18,
    email: "cameron.williamson@ecocare.co.id",
    title: "Internal Applications Engineer",
    department: "Security",
    status: tempStatus("Active"),
    role: "Member",
    imgUrl:
      "https://images.unsplash.com/photo-1566492031773-4f4e44671857?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60",
  },
];
