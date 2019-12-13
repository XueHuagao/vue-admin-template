import request from '@/utils/request'

export function getList(){
    return request({
        url:'testtable',
        method:'get'
    })
}