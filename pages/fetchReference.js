import { PrismaClient } from '@prisma/client'

export default function fetchReference(props) {
  console.log(props);
  return (
    <div>
      <p>Metric Name: {props.data.Metric.name}</p>
      <p>Optional Unit: {props.data.Metric.unit}</p>
      <p>Metric Value: {props.data.metric_value}</p>
      <p>Property Type: {props.data.Metric.Property.property}</p>
    </div>
  )
}

export async function getServerSideProps() {
  const prisma = new PrismaClient()

  const user_metric_data = await prisma.user_metric_data.findUnique({
    where: {
      id: 1,
    },
    include: {
      Metric: {
        include: {
          Property: true
        }
      }
    }
  })

  const serializedData = {
    ...user_metric_data,
    date: user_metric_data.date.toISOString(),
  };

  return {
    props : { data: serializedData }
  }
}
