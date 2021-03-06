import { useQuery } from 'react-query';
import { useTranslation } from 'react-i18next';
import { IExceptionResponse, queryEndpoints, useAlert, ticketsQueryKeys } from '@zblash/op-web-fronted';

async function getTicketRepliesByTicketId(id: string) {
  return queryEndpoints.getTicketRepliesByTicketId({ id });
}

export const useGetTicketRepliesById = (ticketId: string) => {
  const alert = useAlert();
  const { t } = useTranslation();

  return useQuery(ticketsQueryKeys.repliesById(ticketId), () => getTicketRepliesByTicketId(ticketId), {
    onError: (error: IExceptionResponse) => {
      alert.show(`${t(`${error.message}`)}`, {
        type: 'error',
      });
    },
  });
};
