// DONE 2

import HandleMoviesPages from "@/app/Components/HandleMoviesPages";

export default function moviePageNum({ params }) {
  let pageNum = params.pagenum;
  return <HandleMoviesPages pageNum={pageNum} />;
}
