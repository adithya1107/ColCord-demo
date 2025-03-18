import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function InstitutionPage() {
  const departments = [
    { id: 1, name: "Computer Science", faculty: 25, students: 500 },
    { id: 2, name: "Mathematics", faculty: 20, students: 400 },
    { id: 3, name: "Literature", faculty: 15, students: 300 },
    { id: 4, name: "Chemistry", faculty: 18, students: 350 },
  ]

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-3xl font-bold text-foreground">Institution Overview</h1>
      <Card>
        <CardHeader>
          <CardTitle>University Statistics</CardTitle>
          <CardDescription>Overview of our academic community</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div>
              <p className="text-2xl font-bold">4</p>
              <p className="text-sm text-muted-foreground">Departments</p>
            </div>
            <div>
              <p className="text-2xl font-bold">78</p>
              <p className="text-sm text-muted-foreground">Faculty Members</p>
            </div>
            <div>
              <p className="text-2xl font-bold">1,550</p>
              <p className="text-sm text-muted-foreground">Students</p>
            </div>
            <div>
              <p className="text-2xl font-bold">120</p>
              <p className="text-sm text-muted-foreground">Courses Offered</p>
            </div>
          </div>
        </CardContent>
      </Card>
      <h2 className="text-2xl font-bold mt-4">Departments</h2>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {departments.map((dept) => (
          <Card key={dept.id}>
            <CardHeader>
              <CardTitle>{dept.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-2">Faculty: {dept.faculty}</p>
              <p className="text-sm text-muted-foreground mb-4">Students: {dept.students}</p>
              <Button className="w-full">View Department</Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

