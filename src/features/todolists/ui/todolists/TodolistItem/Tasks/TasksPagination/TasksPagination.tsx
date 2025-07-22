import { PAGE_SIZE } from '@/common/constants'
import Pagination from '@mui/material/Pagination'
import { ChangeEvent } from 'react'
import styles from './TasksPagination.module.css'
import Box from '@mui/material/Box'

type Props = {
  totalCount: number
  page: number
  setPage: (page: number) => void
}

export const TasksPagination = ({ totalCount, page, setPage }: Props) => {
  const changePage = (_: ChangeEvent<unknown>, page: number) => {
    setPage(page)
  }

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: '20px',
      }}
    >
      <Pagination
        sx={{ margin: '0' }}
        count={Math.ceil(totalCount / PAGE_SIZE)}
        page={page}
        onChange={changePage}
        shape="rounded"
        color="primary"
        className={styles.pagination}
      />
    </Box>
  )
}
