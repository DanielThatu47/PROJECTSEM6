export default function Widget() {
    return (
      <body>
        <div className="container mx-auto px-4">
          <div className="bg-blue-500 text-white p-4 rounded-lg shadow-md">
            <h1 className="text-3xl font-bold">TEIT-B (JAN-JUN 24)</h1>
            <p className="text-xl">Ms. Priya Chaudhari</p>
          </div>
  
          <div className="grid grid-cols-3 gap-4 mt-4">
            <div className="col-span-1 bg-zinc-100 p-4 rounded-lg shadow-sm">
              <h2 className="font-semibold text-lg mb-2">Upcoming</h2>
              <p>Woohoo, no work due soon!</p>
              <button className="mt-4 bg-blue-600 text-white rounded py-2 px-4">View all</button>
            </div>
  
            <div className="col-span-2">
              <div className="bg-white p-4 rounded-lg shadow-sm mb-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-lg">
                    TRINITY CHETTIAR posted a new material: MAD Lab Question bank
                  </h3>
                  <p className="text-sm text-zinc-600">Apr 19</p>
                </div>
              </div>
  
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-lg">Mrinmoyee Mukherjee</h3>
                  <p className="text-sm text-zinc-600">Apr 18</p>
                </div>
                <p>Dear Students,</p>
                <p>
                  All students are requested to upload the following in the respective batch folders
                  the following SNL documents-
                </p>
                <ol className="list-decimal ml-4">
                  <li>Soft copy of report</li>
                  <li>Soft copy of final presentation</li>
                  <li>Video of working model/ Few output pictures</li>
                </ol>
                <p>Groups have to create individual project folders and then upload the documents</p>
                <a
                  href="https://drive.google.com/drive/folders/1CAYexRuQjMqjpOFebnI4jBxZ0jYFHzCp?usp=sharing"
                  className="text-blue-600">
                  Document Link
                </a>
              </div>
            </div>
          </div>
        </div>
      </body>
    )
  }
  